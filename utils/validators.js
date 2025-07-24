function isValidUUID(uuid) {
   const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
   return uuidRegex.test(uuid);
}

function isValidDate(dateStr) {
   const regex = /^\d{4}-\d{2}-\d{2}$/;
   if (!regex.test(dateStr)) return false;
   const date = new Date(dateStr);
   return !isNaN(date.getTime());
}

function isFutureDate(dateStr) {
   const date = new Date(dateStr);
   const now = new Date();
   return date > now;
}

module.exports = {
   isValidUUID,
   isValidDate,
   isFutureDate,
};
