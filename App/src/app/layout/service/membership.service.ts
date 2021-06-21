import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { MembershipClient } from 'proto/members_pb_service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from 'proto/members_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { MemberUser } from '../models/member';
import { mapDateFromTimestamp } from './timestamp-map';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  metadata = new grpc.Metadata;
  membershipUrl = environment.membershipUrl;

  grpcClient: MembershipClient;

  private membersSubject: BehaviorSubject<MemberUser[]> = new BehaviorSubject<MemberUser[]>([]);
  members$: Observable<MemberUser[]> = this.membersSubject.asObservable();

  constructor() { 
    this.grpcClient = new MembershipClient(this.membershipUrl);
  }

  getMembers() {
    let req = new Empty();

    this.grpcClient.getMembersStream(req, this.metadata).on('data', (member: Member) => {

      let members = this.membersSubject.getValue();
      members.push(this.mapMemberUser(member));

      this.membersSubject.next(members);

    }).on('end', () => {
      console.log('End of request');
    });
  }

  private mapMemberUser(member: Member): MemberUser{
    return {
      id: member.getId(),
      age: member.getAge(),
      name: member.getName(),
      address: member.getAddress(),
      city: member.getCity(),
      post_code: member.getPostCode(),
      dob: mapDateFromTimestamp(member.getDob)
    }
  }
}
