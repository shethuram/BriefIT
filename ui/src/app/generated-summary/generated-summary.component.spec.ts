import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSummaryComponent } from './generated-summary.component';

describe('GeneratedSummaryComponent', () => {
  let component: GeneratedSummaryComponent;
  let fixture: ComponentFixture<GeneratedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratedSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
