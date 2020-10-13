import { NgModule } from '@angular/core';
import { ProductFilterPipe } from './product-filter.pipe';
import { UserFilterPipe } from './user-filter.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { RelativeTimePipe } from './relative-time.pipe';




@NgModule({
  declarations: [ProductFilterPipe, UserFilterPipe, CategoryFilterPipe, RelativeTimePipe],
  exports: [ProductFilterPipe, UserFilterPipe, CategoryFilterPipe, RelativeTimePipe]
})
export class PipesModule { }
