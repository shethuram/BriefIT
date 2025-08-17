// groq-api.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroqApiService {

  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey = ''  // api key here 

  constructor(private http: HttpClient) { }

  getSummary(transcript: string, instruction: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const prompt = `Transcript: ${transcript}
Instruction: ${instruction}
Generate a structured summary based on the instruction.`;

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: prompt
      }]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
