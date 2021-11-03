import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateempleadosComponent } from './crateempleados.component';

describe('CrateempleadosComponent', () => {
  let component: CrateempleadosComponent;
  let fixture: ComponentFixture<CrateempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrateempleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrateempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
