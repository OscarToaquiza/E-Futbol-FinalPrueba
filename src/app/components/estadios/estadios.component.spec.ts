import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadiosComponent } from './estadios.component';

describe('EstadiosComponent', () => {
  let component: EstadiosComponent;
  let fixture: ComponentFixture<EstadiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
