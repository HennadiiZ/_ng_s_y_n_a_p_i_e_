import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.scss']
})
export class ChooseLevelComponent {
  public isLoading = false;
  public levels = [
    {
      description: 'If you just started studying',
      selected: false,
      title: 'Novice'
    },
    {
      description: 'You know the basics',
      selected: false,
      title: 'Competent'
    },
    {
      description: 'Before Final Exam',
      selected: false,
      title: 'Expert'
    }
  ];

  constructor(
    private authService: AuthService,
    private fs: FirestoreService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  public get selectedLevel(): {
    description: string;
    selected: boolean;
    title: string;
  } | undefined {
    return this.levels.find((level) => level.selected);
  }

  public handleLevelSelect(idx: number): void {
    this.levels.forEach((level, index) => {
      level.selected = idx === index ? !level.selected : false;
    });
  }

  public onFinish(): void {
    if (!!this.authService._currentUser.value) {
      this.isLoading = true;
      const userId = this.authService._currentUser.value.uid;
      const level = this.selectedLevel?.title.toLowerCase();

      this.fs.setUserData(userId, { level }).then(() => {
        this.authService.updateUserData({ level });
        this.isLoading = false;
        this.router.navigateByUrl('');
        this.snackbarService.showSuccess('Registration completed!');
      });
    }
  }
}
