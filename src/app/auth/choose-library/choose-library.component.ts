import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-choose-library',
  templateUrl: './choose-library.component.html',
  styleUrls: ['./choose-library.component.scss']
})
export class ChooseLibraryComponent {
  constructor(
    private authService: AuthService,
    private fs: FirestoreService,
    private router: Router
  ) {}

  onLibrarySelect(library: string): void {
    if (!!this.authService._currentUser.value) {
      const userId = this.authService._currentUser.value.uid;

      this.fs.setUserData(userId, { library }).then(() => {
        this.authService.updateUserData({ library });
        this.router.navigateByUrl('auth/choose-level');
      });
    }
  }
}
