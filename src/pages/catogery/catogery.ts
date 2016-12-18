import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { Category } from '../../shared/interfaces'
import { CategoryMappingsService } from '../../shared/categoryMappingService'
/*
Generated class for the ProfilePage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'catogery-ui',
  templateUrl: 'catogery.html'
})
export class CatogeryPage {

  category: Category = { parentCategory: "general", name: "" };
  title: string;
  categories: Array<{ name: string, value: string, checked: boolean }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, categoryMappingService: CategoryMappingsService) {
      this.categories=[];
    this.category.parentCategory = navParams.data;
    let childCategories = categoryMappingService.getChildCategories(this.category.parentCategory);
    for (let i = 0; i < childCategories.length; i++) {
      this.categories.push({ name: childCategories[i], value: childCategories[i], checked: false })
    }
  
    this.title = categoryMappingService.getTitleForCategory(this.category.parentCategory);
  }

  openPostPage(selectedCategory) {
    this.category.name = selectedCategory
    this.navCtrl.push(PostPage, this.category);
  }

}
