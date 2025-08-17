import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GroqApiService } from '../services/groq-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
   imports: [FormsModule , RouterModule],  
  templateUrl: './upload.component.html',
  
})
export class UploadComponent {
  transcriptText: string = '';
  instruction: string = '';

  constructor(private groqService: GroqApiService, private router: Router) {}

  // Handle file upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.transcriptText = reader.result as string;
    };
    reader.readAsText(file);
  }

  generateSummary() {
    if (!this.transcriptText || !this.instruction) {
      alert("Please enter transcript and instruction");
      return;
    }

    this.groqService.getSummary(this.transcriptText, this.instruction)
  .subscribe({
    next: (res: any) => {
      let summaryText = res?.choices?.[0]?.message?.content || "No summary found";
      summaryText = summaryText.replace(/\*\*(.*?)\*\*/g, (_: any, text: string) => text.toUpperCase());

      this.router.navigate(['/summary'], { state: { summary: summaryText } });
    },
    error: (err: any) => {
      console.error("Error generating summary:", err);
      alert("Failed to generate summary. Please try again.");
    }
  });


    
  }
}
