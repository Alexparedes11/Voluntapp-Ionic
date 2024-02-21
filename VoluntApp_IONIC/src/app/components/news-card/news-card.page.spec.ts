import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardPage } from './news-card.page';

describe('NewsCardPage', () => {
  let component: NewsCardPage;
  let fixture: ComponentFixture<NewsCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewsCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
