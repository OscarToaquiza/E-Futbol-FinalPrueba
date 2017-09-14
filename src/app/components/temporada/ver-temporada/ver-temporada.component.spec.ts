import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTemporadaComponent } from './ver-temporada.component';

describe('VerTemporadaComponent', () => {
  let component: VerTemporadaComponent;
  let fixture: ComponentFixture<VerTemporadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTemporadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
