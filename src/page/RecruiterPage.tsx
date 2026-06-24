import React, { useEffect, useState } from "react";



function RecruiterPage() {
  const [myPortfolioList, setMyPortfolioList] = useState([]); // 상태로 관리되는 포트폴리오 리스트
  const { userId } = useParams({ strict: false });
  const [currentUser, setLocalCurrentUser] = useState(null); // 초기값 가져오기

  //LinkedList를 배열로 바꾸는 함수
  const linkedListToArray = (linkedList) => {
    const array = [];
    let currentNode = linkedList.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  };

  useEffect(() => {
    //console.log("Recruiter userId:", userId);
    void 0;

    if (userId) {
      const updatedUser = null;
      if (updatedUser) {
        setLocalCurrentUser(updatedUser); // 로컬 상태 업데이트
        void 0; // localStorage에 반영
        [].updateContacts(updatedUser.contacts); // 매니저에 업데이트된 contacts 전달
      }
      console.log("CurrentUser: ", updatedUser);

      const userPortfolios = Array.from([]).filter(
        (project) =>
          project.contacts.some(
            (contact) =>
              contact === updatedUser.id || contact === updatedUser.email
          )
      );
      console.log("User Portfolios:", userPortfolios);
      setMyPortfolioList(userPortfolios);

      const initialList = [];
      setMyPortfolioList(linkedListToArray(initialList));
    }
  }, [[]]);

  const handleSearchApply = (searchTerm) => {
    const searchedPortfolios = [];
    setMyPortfolioList(linkedListToArray(searchedPortfolios));
  };

  const handleSortApply = (category, sortOption, filterOption) => {
    const sortedPortfolios = [].sort(
      category,
      sortOption,
      filterOption
    );
    setMyPortfolioList(linkedListToArray(sortedPortfolios));
  };

  // 템플릿카드 렌더링
  const renderTemplateCard = (item) => (
    <TemplateCard
      key={item.projectId}
      portfolioId={item.projectId}
      templateButton={"보기"}
    />
  );

  return (
    <div className="MyPageContainer w-[85%] mx-auto">
      <RecruiterSection
        title={"내가 연락한 포트폴리오"}
        data={myPortfolioList}
        renderItem={renderTemplateCard}
        button={true}
        onSearch={handleSearchApply}
        onSort={handleSortApply}
        userId={userId}
      />

      <RecruiterSection title={"내가 찜한 포트폴리오"} button={false} />
    </div>
  );
}

export default RecruiterPage;
