/**
 * Status color mapping and utility functions for order management
 */

// Status color mapping
export const statusColors = {
    pending: "rgba(var(--bs-warning-rgb), 0.3)",
    intransit: "rgba(var(--bs-primary-rgb), 0.3)", // Adjusted to match the pattern
    delivered: "rgba(var(--bs-success-rgb), 0.3)",
    complete: "rgba(var(--bs-success-rgb), 0.3)",
    cancelled: "rgba(var(--bs-danger-rgb), 0.3)"
  };

/**
 * Get the color for a given status
 * @param {string} status - The order status
 * @returns {string} The color associated with the status
 */
export const getStatusColor = (status) => {
  return statusColors[status.toLowerCase()] || "gray";
};

/**
 * Get the Bootstrap variant for a given status
 * @param {string} status - The order status
 * @returns {string} The Bootstrap variant name
 */
export const getStatusVariant = (status) => {
  const variantMap = {
    pending: "warning",
    intransit: "primary",
    delivered: "success",
    complete: "success",
    cancelled: "danger"
  };
  return variantMap[status.toLowerCase()] || "secondary";
};

/**
 * Check if a status is considered active/in-progress
 * @param {string} status - The order status
 * @returns {boolean} Whether the status is active
 */
export const isActiveStatus = (status) => {
  const activeStatuses = ['pending', 'intransit'];
  return activeStatuses.includes(status.toLowerCase());
};

/**
 * Get the display text for a status (with proper capitalization)
 * @param {string} status - The order status
 * @returns {string} The formatted status text
 */
export const getStatusDisplayText = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

/**
 * Get all available status options
 * @returns {Array} Array of status options
 */
export const getStatusOptions = () => {
  return Object.keys(statusColors);
}; 