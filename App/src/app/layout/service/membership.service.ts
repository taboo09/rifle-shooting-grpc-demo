import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  metadata = new grpc.Metadata;
  membershipUrl = environment.membershipUrl;

  constructor() { }

  addMember(member: any) {

  }
}
