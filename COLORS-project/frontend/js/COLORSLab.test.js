const { doLogin, searchColor } = require('./code.js')

test('Testing doLogin function', () => {
  document.body.innerHTML = `
        <span id="inner-title">PLEASE LOG IN</span>
        <input type="text" id="loginName" placeholder="Username" value="TestUser1" /><br />
        <input type="password" id="loginPassword" placeholder="Password" value="Test1"/><br />
        <button type="button" id="loginButton" class="buttons" onclick="doLogin();"> Login </button>
        <span id="loginResult"></span>`

  window.XMLHttpRequest = jest.fn(() => ({
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  }))

  doLogin()

  const result = document.getElementById('loginResult')
  expect(result.innerHTML).toBe('')
  const login = document.getElementById('loginName')
  expect(login.value).toBe('TestUser1')
  const password = document.getElementById('loginPassword')
  expect(password.value).toBe('Test1')
})

test('Testing searchColor API endpoint with correct JSON structure', () => {
  document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Color To Search For" value="Purple"/>
    <button type="button" id="searchColorButton" class="buttons" onclick="searchColor();"> Search Color </button><br />
    <span id="colorSearchResult"></span>
    <p id="colorList">
    `

  const xhrMock = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  }
  window.XMLHttpRequest = jest.fn(() => xhrMock)

  searchColor()

  const expectedJSONPaylod = JSON.stringify({ search: 'Purple', userId: 0 })

  expect(xhrMock.send).toHaveBeenCalledWith(expectedJSONPaylod)
})
