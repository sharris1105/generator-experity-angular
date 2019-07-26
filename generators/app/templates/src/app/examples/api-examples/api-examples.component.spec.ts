import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiExamplesComponent } from './api-examples.component';

describe('SampleApiComponent', () => {
  let component: ApiExamplesComponent;
  let fixture: ComponentFixture<ApiExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiExamplesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
