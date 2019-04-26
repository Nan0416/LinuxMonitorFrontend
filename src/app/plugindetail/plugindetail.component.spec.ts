import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugindetailComponent } from './plugindetail.component';

describe('PlugindetailComponent', () => {
  let component: PlugindetailComponent;
  let fixture: ComponentFixture<PlugindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlugindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
