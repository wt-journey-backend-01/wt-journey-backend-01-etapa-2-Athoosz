function isValidUUID(uuid) {
   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
   return uuidRegex.test(uuid);
}


// Aceita datas no formato YYYY-MM-DD ou YYYY/MM/DD
function isValidDate(dateStr) {
   if (typeof dateStr !== "string") return false;
  
   const regex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$/;
   if (!regex.test(dateStr)) return false;
   
   const normalized = dateStr.replace(/[\/]/g, "-");
   const date = new Date(normalized);
 
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
