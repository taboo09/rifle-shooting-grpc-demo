import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { User, UserValid } from 'proto/new-user_pb';
import { NewUserClient } from 'proto/new-user_pb_service';
import { defer, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mapDateToTimestamp } from './timestamp-map';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  metadata = new grpc.Metadata;
  registrationUrl = environment.registrationUrl;

  grpcClient: NewUserClient;

  constructor() { 
    this.grpcClient = new NewUserClient(this.registrationUrl);
  }

  addUser(user: any): Observable<any>{
    let req = this.mapObjToProto(user);

    return defer(() => {
      return new Promise((resolve, reject) => {

        this.grpcClient.addUser(req, this.metadata, (err, res) => {
          if (err){
            return reject(err);
          }
          else {
            let result = res?.toObject() as UserValid.AsObject;

            return resolve(result);
          }
        })
      });
    });
  }

  private mapObjToProto(userData: any): User{
    let user: User = new User();

    user.setFirstName(userData.first_name);
    user.setLastName(userData.last_name);
    user.setCity(userData.city);
    user.setAddress(userData.address);
    user.setPostCode(userData.post_code);
    user.setDob(mapDateToTimestamp(userData.dob));

    return user;
  }
}