import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-generated-summary',
  imports: [FormsModule , RouterModule],  
  templateUrl: './generated-summary.component.html',
  styleUrls: ['./generated-summary.component.css']
})
export class GeneratedSummaryComponent {
  summaryText: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { summary: string };
    this.summaryText = state?.summary || ''; 
  }

  shareSummary() {
    this.router.navigate(['/share'], { state: { summary: this.summaryText } });
  }
}
