import { Component, EventEmitter, OnInit, OnDestroy, Input, Output, HostListener } from '@angular/core';

import { ITopic } from '../interfaces';
import { DataService } from '../dataservice';

@Component({
    selector: 'forum-topic',
    templateUrl: 'topic.component.html'
})
export class TopicComponent implements OnInit, OnDestroy {
    @Input() topic: any;
    @Output() onViewComments = new EventEmitter<any>();

    constructor(private dataService: DataService) { }

    ngOnInit() {
        var self = this;
    //    self.dataService. getTopicsRef().child(self.topic.subject).on('child_changed', self.onCommentAdded);
    }

    ngOnDestroy() {
         console.log('destroying..');
        //var self = this;
        //self.dataService.getTopicsRef().child(self.topic.subject).off('child_changed', self.onCommentAdded);
    }

    // Notice function declarion to keep the right this reference
    public onCommentAdded = (childSnapshot, prevChildKey) => {
       console.log(childSnapshot.val());
        var self = this;
        // Attention: only number of comments is supposed to changed.
        // Otherwise you should run some checks..
        //self.topic.responses = childSnapshot.val();
    }

    @HostListener('click', ['$event'])
    goToPostDetail(event: any) {
      this.topic.event = event;
      this.onViewComments.emit(this.topic);
    }

}
