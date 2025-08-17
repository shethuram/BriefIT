import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSummaryComponent } from './share-summary.component';

describe('ShareSummaryComponent', () => {
  let component: ShareSummaryComponent;
  let fixture: ComponentFixture<ShareSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
