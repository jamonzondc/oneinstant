import { Component, HostBinding, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { StorieService } from '../stories/storie.service';
import { log } from 'util';
import { MatSnackBar } from '@angular/material';
import { ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FollowersService } from '../followers/followers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  
  
 
 
  ngOnInit(): void {
  
  }

  
}
