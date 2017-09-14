import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentoComponent } from './reglamento.component';

describe('ReglamentoComponent', () => {
  let component: ReglamentoComponent;
  let fixture: ComponentFixture<ReglamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
