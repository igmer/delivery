import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientDataModalPage } from './client-data-modal.page';

describe('ClientDataModalPage', () => {
  let component: ClientDataModalPage;
  let fixture: ComponentFixture<ClientDataModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDataModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDataModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
