interface TermsUpdatedInfoProps {
  date: string;
}
const TermsUpdatedInfo = ({ date }: TermsUpdatedInfoProps) => {
  const convertDate = (target: string) => {
    const targetArr = target.split("-");
    const yy = targetArr[0];
    const dd = targetArr[2];
    let mm = "";

    switch (targetArr[1]) {
      case "01":
        mm = "Jan.";
        break;
      case "02":
        mm = "Feb.";
        break;
      case "03":
        mm = "Mar.";
        break;
      case "04":
        mm = "Apr.";
        break;
      case "05":
        mm = "May.";
        break;
      case "06":
        mm = "Jun.";
        break;
      case "07":
        mm = "Jul.";
        break;
      case "08":
        mm = "Aug.";
        break;
      case "09":
        mm = "Sep.";
        break;
      case "10":
        mm = "Oct.";
        break;
      case "11":
        mm = "Nov.";
        break;
      case "12":
        mm = "Dec.";
        break;
      default:
        break;
    }

    return `${mm} ${dd}, ${yy}`;
  };

  return <p className="text-text03">Last Updated: {convertDate(date)}</p>;
};

export default TermsUpdatedInfo;
