import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberUser } from '../models/member';
import { MembershipService } from '../service/membership.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {

  members$: Observable<MemberUser[]>;

  constructor(private membershipService: MembershipService) { }

  ngOnInit(): void {
    this.membershipService.getMembers();

    this.members$ = this.membershipService.members$;
  }

}
