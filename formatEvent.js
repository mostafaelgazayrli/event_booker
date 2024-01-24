const formatEvent = (event) => {
  return {
    title: event.eventName,
    month: new Date(event.eventDate).getMonth() + 1,
    day: new Date(event.eventDate).getDate(),
    venue: event.venueName,
    image: event.image,
    detailsTitle: event.eventName,
    details: [
      { label: "Event Date", value: new Date(event.eventDate).toDateString() },
      { label: "Event Time", value: event.eventTime },
    ],
    organizer: {
      initials: `${event.creator.firstName.charAt(
        0
      )}${event.creator.lastName.charAt(0)}`,
      name: `${event.creator.firstName} ${event.creator.lastName}`,
      email: event.creator.email,
    },
    eventId: event.id,
    description: event.description,
    dateTime: `${new Date(event.eventDate).toDateString()}, ${event.eventTime}`,
    location: `${event.venueName}, ${event.venueAddressLine}, ${event.venueCity}, ${event.venueState} ${event.venueZipCode}`,
    tickets: [
      {
        price: event.ticketPrice,
        remaining: event.availableTickets,
        id: event.id,
      },
    ],
  };
};

module.exports = formatEvent;
