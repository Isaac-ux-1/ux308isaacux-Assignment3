let currentState = welcoming;

const order = {
  item: null,
  upsell: null,
  total: 0,
};

const menu = {
  burger: {
    label: 'Classic Burger',
    price: 8.99,
    upsellLabel: 'seasoned fries',
    upsellPrice: 2.99,
  },
  pizza: {
    label: 'Pepperoni Pizza Slice Combo',
    price: 9.99,
    upsellLabel: 'garlic dip',
    upsellPrice: 1.49,
  },
};

export function handleInput(sInput = '') {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  order.item = null;
  order.upsell = null;
  order.total = 0;
}

function welcoming(sInput) {
  const cleaned = normalize(sInput);
  const aReturn = [
    "Welcome to Isaac's Pizza & Burger.",
    'Today\'s popular picks are the Classic Burger and the Pepperoni Pizza Slice Combo.',
  ];

  const firstChoice = detectMainChoice(cleaned);
  if (firstChoice) {
    selectMainItem(firstChoice);
    currentState = upsell;
    aReturn.push(`${menu[firstChoice].label} added to your order.`);
    aReturn.push(`Would you like to add ${menu[firstChoice].upsellLabel} for $${menu[firstChoice].upsellPrice.toFixed(2)}?`);
    return aReturn;
  }

  currentState = choosingMain;
  aReturn.push('Please choose one: Classic Burger or Pepperoni Pizza Slice Combo.');
  return aReturn;
}

function choosingMain(sInput) {
  const cleaned = normalize(sInput);
  const choice = detectMainChoice(cleaned);

  if (!choice) {
    return [
      'I can help with that.',
      'Please type burger or pizza to start your order.',
    ];
  }

  selectMainItem(choice);
  currentState = upsell;
  return [
    `${menu[choice].label} added to your order.`,
    `Would you like to add ${menu[choice].upsellLabel} for $${menu[choice].upsellPrice.toFixed(2)}?`,
  ];
}

function upsell(sInput) {
  const cleaned = normalize(sInput);

  if (isYes(cleaned)) {
    order.upsell = menu[order.item].upsellLabel;
    order.total += menu[order.item].upsellPrice;
    currentState = checkout;
    return [
      `${capitalize(order.upsell)} added.`,
      `Your total is now $${order.total.toFixed(2)}. Would you like to place this order?`,
    ];
  }

  if (isNo(cleaned)) {
    currentState = checkout;
    return [
      `No problem — keeping just the ${menu[order.item].label}.`,
      `Your total is $${order.total.toFixed(2)}. Would you like to place this order?`,
    ];
  }

  return [
    `Please answer yes or no. Would you like to add ${menu[order.item].upsellLabel}?`,
  ];
}

function checkout(sInput) {
  const cleaned = normalize(sInput);

  if (isYes(cleaned)) {
    const pickupTime = new Date();
    pickupTime.setMinutes(pickupTime.getMinutes() + 20);
    const pickupLabel = pickupTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    const orderSummary = order.upsell
      ? `${menu[order.item].label} with ${order.upsell}`
      : menu[order.item].label;

    clearInput();
    return [
      `Perfect — your order for ${orderSummary} has been placed.`,
      `Please pick it up before ${pickupLabel}.`,
    ];
  }

  if (isNo(cleaned)) {
    clearInput();
    return [
      'No worries — your order was not placed.',
      'You can start a new order anytime.',
    ];
  }

  return ['Please answer yes or no so I can finish your order.'];
}

function selectMainItem(choice) {
  order.item = choice;
  order.upsell = null;
  order.total = menu[choice].price;
}

function detectMainChoice(input) {
  if (input.includes('burger')) return 'burger';
  if (input.includes('pizza')) return 'pizza';
  return null;
}

function isYes(input) {
  return input.startsWith('y') || input.includes('sure') || input.includes('ok');
}

function isNo(input) {
  return input.startsWith('n');
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
