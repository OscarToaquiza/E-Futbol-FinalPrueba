import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionComponent } from './sancion.component';

describe('SancionComponent', () => {
  let component: SancionComponent;
  let fixture: ComponentFixture<SancionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SancionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
