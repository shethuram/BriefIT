import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-share-summary',
  imports: [FormsModule, RouterModule],
  templateUrl: './share-summary.component.html',
  styleUrls: ['./share-summary.component.css']
})
export class ShareSummaryComponent {
  emails: string = '';
  message: string = '';
  summaryText: string = ''; // summary from router state

  constructor(private userService: UserService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { summary: string };
    this.summaryText = state?.summary || ''; 
  }

  sendSummary() {
    const emailList = this.emails
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (emailList.length === 0) {
      alert('Please enter at least one valid email address.');
      return;
    }

    // Combine user message and summary
    const body = `${this.message ? this.message + '\n\n' : ''}${this.summaryText}`;

    const payload = {
      recipientEmails: emailList,
      message: body
    };

    this.userService.sendSummaryEmail(payload).subscribe({
      next: () => alert('Mail sent successfully!'),
      error: () => alert('Mail sending failed!')
    });
  }

  logout() {

    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
