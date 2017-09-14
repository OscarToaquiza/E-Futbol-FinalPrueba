import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTemporadaComponent } from './lista-temporada.component';

describe('ListaTemporadaComponent', () => {
  let component: ListaTemporadaComponent;
  let fixture: ComponentFixture<ListaTemporadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTemporadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTemporadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
