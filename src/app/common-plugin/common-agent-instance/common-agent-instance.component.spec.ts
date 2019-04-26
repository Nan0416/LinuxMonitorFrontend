import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAgentInstanceComponent } from './common-agent-instance.component';

describe('CommonAgentInstanceComponent', () => {
  let component: CommonAgentInstanceComponent;
  let fixture: ComponentFixture<CommonAgentInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonAgentInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAgentInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
