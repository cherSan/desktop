import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinRenderComponent } from '@miner/grid';

describe('CoinRenderComponent', () => {
  let component: CoinRenderComponent;
  let fixture: ComponentFixture<CoinRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
