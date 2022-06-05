const $expenseForm = document.querySelector('#expense-form');
const $displayArea = document.querySelector('#display-area');


const handleExpenseFormSubmit = event => {
  event.preventDefault();

  
  const name = $expenseForm.querySelector('[name="expense-name"]').value;
  const expenses = $expenseForm.querySelector('[name="expenses"]').value;
  const expenseRadioHTML = $expenseForm.querySelectorAll('[name="expense"]');
  let expense;

  for (let i = 0; i < expenseRadioHTML.length; i += 1) {
    if (expenseRadioHTML[i].checked) {
      expense = expenseRadioHTML[i].value;
    }
  }

  if (expense === undefined) {
    expense = '';
  }

  const selectedExpenses = $expenseForm.querySelector('[name="paid"').selectedOptions;
  const paidExpenses = [];
  for (let i = 0; i < selectedExpenses.length; i += 1) {
    paidExpenses.push(selectedExpenses[i].value);
  }
  const expenseObject = { name, expenses, expense, paidExpenses };

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expenseObject)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert(`Error: ${response.statusText}`);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding an expense!');
    });
};

$expenseForm.addEventListener('submit', handleExpenseFormSubmit);

const printResults = resultArr => {
  console.log(resultArr);
const expenseHTML = resultArr.map(({ id, name, expenses, expense, paidExpenses }) => {
  return `
<div class="col-12 col-md-5 mb-3">
  <div class="card p-3" data-id=${id}>
    <h4 class="text-primary">${name}</h4>
    <pAmount: ${amount.substring(0, 1).toUpperCase() + amount.substring(1)}<br/>
    Expense: ${expense.substring(0, 1).toUpperCase() + expense.substring(1)}<br/>
    Paid Exoenses: ${paidExpenses
      .map(paid => `${paid.substring(0, 1).toUpperCase() + paid.substring(1)}`)
      .join(', ')}</p>
  </div>
</div>
  `;
});
$displayArea.innerHTML = expenseHTML.join('');
};
