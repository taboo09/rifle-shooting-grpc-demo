import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { MembershipClient } from 'proto/members_pb_service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberIn, MemberOut } from 'proto/members_pb';
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

    this.grpcClient.getMembersStream(req, this.metadata).on('data', (member: MemberOut) => {

      let members = this.membersSubject.getValue();
      members.push(this.mapMemberUser(member?.toObject() as MemberOut.AsObject));

      this.membersSubject.next(members);

      console.log(this.mapMemberUser(member?.toObject() as MemberOut.AsObject));

    })
    // .on('end', () => {
    //   console.log('End of request');
    // });
  }

  private mapMemberUser(member: any): MemberUser{
    return {
      id: member.id,
      age: member.age,
      name: member.name,
      address: member.address,
      city: member.city,
      post_code: member.postCode,
      dob: mapDateFromTimestamp(member.dob)
    }
  }
}
