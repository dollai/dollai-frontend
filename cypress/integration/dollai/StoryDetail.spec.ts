
describe('스토리 상세 페이지', () => {
  it('스토리 상세 페이지 url 이 열려야 한다.', () => {
    cy.visit('/stories/story1');

    cy.wait(1000);
    cy.get('.message-container').click();
    cy.wait(1000);
    cy.get('.message-container').click();
  });
});
