import { Injectable } from '@angular/core';

@Injectable()
export class CategoryMappingsService {

  childToParentMap = { "sports": "entertainment", "movies": "entertainment", "events": "entertainment" }
  parentToChildMap = { "entertainment": ['sports','movies','events'],
  "services": ['plumber','electrician','maid'],
  "jobs": ['IT','Bank','Governament'],
  "buyandsell": ['buy','sell'] ,    
  "travel": ['bus','train','flight']         
 }
  titleToCategoryMap = {
    "Entertainment": "entertainment", "Travel": "travel",
    "Buy and sell": "buyandsell", "Jobs": "jobs", "Services": "services"
  }
  categoryToTitleMap = {
    "entertainment": "Entertainment", "travel": "Travel",
    "buyandsell": "Buy and sell", "jobs": "Jobs", "services": "Services"
  }
  getParentCatogery(childkey: string) {
    return this.childToParentMap[childkey];
  }
  getChildCategories(parenkey: string) {
    return this.parentToChildMap[parenkey];
  }
  getCategoryByTitle(titleKey: string) {
    return this.titleToCategoryMap[titleKey];
  }

  getTitleForCategory(category: string) {
    return this.categoryToTitleMap[category];
  }

}
