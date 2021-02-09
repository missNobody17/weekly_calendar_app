import { reactive } from 'vue';
import { seedData } from './seed.js';

export const store = {
    state: {
        data: reactive(seedData)
    },
    getEventObj(dayId, eventDetails){
        const dayObj = this.state.data.find(
            day => day.id === dayId
        );
        return dayObj.events.find(
            event => event.details === eventDetails
        );
    },
    getActiveDay () {
        return this.state.data.find((day) => day.active);
    },
    setActiveDay (dayId) {
        this.state.data.map((dayObj) => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
        });
    },
    submitEvent(eventDetails) {
        const activeDay = this.getActiveDay()
        activeDay.events.push({"details": eventDetails, "edit": false})

    },
    editEvent (dayId, eventDetails) {
        this.resetEditOfAllEvents();
        const eventObj = this.getEventObj(dayId, eventDetails);
        eventObj.edit = true;
    },
    resetEditOfAllEvents () {
        this.state.data.map((dayObj) => {
            dayObj.events.map((event) => {
                event.edit = false;
            });
        });
    },
    updateEvent(dayId, originalEventDetails, updatedEventDetails){
        const eventObj = this.getEventObj(dayId, originalEventDetails);
        eventObj.details = updatedEventDetails;
        eventObj.edit = false;
    },
    deleteEvent(dayId, eventDetails){
      const dayObj = this.state.data.find((day) => day.id === dayId);
      const eventObj = dayObj.events.findIndex(
          event => event.details === eventDetails
      );
      dayObj.events.splice(eventObj);
    },
}
