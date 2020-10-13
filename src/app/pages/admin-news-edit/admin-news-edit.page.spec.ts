import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminNewsEditPage } from './admin-news-edit.page';

describe('AdminNewsEditPage', () => {
  let component: AdminNewsEditPage;
  let fixture: ComponentFixture<AdminNewsEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNewsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
