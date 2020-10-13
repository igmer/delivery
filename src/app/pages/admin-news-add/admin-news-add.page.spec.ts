import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminNewsAddPage } from './admin-news-add.page';

describe('AdminNewsAddPage', () => {
  let component: AdminNewsAddPage;
  let fixture: ComponentFixture<AdminNewsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNewsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
