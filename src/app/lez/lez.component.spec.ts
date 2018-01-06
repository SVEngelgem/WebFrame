import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LezComponent } from './lez.component';

describe('LezComponent', () => {
  let component: LezComponent;
  let fixture: ComponentFixture<LezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
