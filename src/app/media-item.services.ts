import { Injectable } from "@angular/core";
import { MediaItem } from "./media-item.model";

@Injectable({ providedIn: 'root' })
export class MediaItemService {
    mediaItems: MediaItem[] = [{
        name: 'Cup',
        description: 'Cup of tea',
    }];

    get() {
        return this.mediaItems;
    }

    add(mediaItem: MediaItem) {
        this.mediaItems.push(mediaItem);
    }

    delete(mediaItem: MediaItem) {
        const index = this.mediaItems.indexOf(mediaItem);
        if (index >= 0) {
            this.mediaItems.splice(index, 1);
        }
    }
}