import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminNewsListPage } from './admin-news-list.page';

describe('AdminNewsListPage', () => {
  let component: AdminNewsListPage;
  let fixture: ComponentFixture<AdminNewsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNewsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
