import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeColaborador } from './home-colaborador';

describe('HomeColaborador', () => {
  let component: HomeColaborador;
  let fixture: ComponentFixture<HomeColaborador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeColaborador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeColaborador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
