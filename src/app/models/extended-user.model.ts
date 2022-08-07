import { User } from "@angular/fire/auth";

export interface ExtendedUser extends User {
  library?: null | string,
  level?: null | string
}
