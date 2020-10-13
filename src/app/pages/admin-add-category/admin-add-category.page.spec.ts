import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminAddCategoryPage } from './admin-add-category.page';

describe('AdminAddCategoryPage', () => {
  let component: AdminAddCategoryPage;
  let fixture: ComponentFixture<AdminAddCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
