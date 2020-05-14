function getValue(val) {
  return val;
}

export default {
  container: {
    width: getValue(750),
    height: getValue(800), //1410,
    borderRadius: 12,
    backgroundColor: "#F5F6FA"
  },

  containerOther: {
    width: 750,
    height: 797
    // backgroundColor: '#F5F6FA'
  },

  header: {
    height: 80,
    width: 750,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#EBEDF5"
  },

  title: {
    width: 102,
    fontSize: 34,
    height: 80,
    lineHeight: 80,
    textAlign: "center",
    color: "#03081a"
    // fontWeight: 'bold',
    // borderBottomWidth: 6,
    // borderColor: '#000000',
  },

  rankList: {
    width: 750,
    height: 559,
    backgroundColor: "#ffffff"
  },

  rankOtherList: {
    width: 750,
    height: 490
  },

  ranklistDirected: {
    height: 797
  },

  list: {
    width: 750,
    height: 490,
    backgroundColor: "#ffffff",
    marginTop: 20
  },

  listOther: {
    width: 750,
    height: 490
  },

  listDirected: {
    height: 400,
    marginTop: 0,
    backgroundColor: "#ff0000"
  },

  listItem: {
    backgroundColor: "#ffffff",
    width: 750,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#EBEDF5"
  },
  listItemOld: {
    backgroundColor: "#ffffff"
  },

  listItemOther: {
    position: "relative",
    width: 750,
    height: 100,
    borderColor: "#e5e5e5",
    borderWidth: 1
  },

  listItemNum: {
    fontSize: 28,
    // fontWeight: 'bold',
    color: "#03081A",
    lineHeight: 100,
    height: 100,
    textAlign: "right",
    marginRight: 19,
    marginLeft: 19,
    width: 40
  },

  listHeadImg: {
    borderRadius: 28,
    width: 56,
    height: 56
  },

  headImg: {
    borderRadius: 28,
    width: 56,
    height: 56,
    marginLeft: 30
  },

  listItemScore: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    height: 100,
    lineHeight: 100,
    width: 100,
    textAlign: "right"
  },

  listItemName: {
    fontSize: 28,
    color: "#03081a",
    height: 100,
    lineHeight: 100,
    width: 430,
    marginLeft: 20
  },

  name: {
    fontSize: 28,
    marginLeft: 28,
    lineHeight: 100
  },

  listScoreUnit: {
    opacity: 0.5,
    color: "#000000",
    fontSize: 28,
    height: 100,
    lineHeight: 100,
    marginLeft: 5,
    marginRight: 19,
    width: 28
  },

  selfListItem: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 0
  },

  itemButton: {
    position: "absolute",
    top: 22,
    right: 32,
    width: 116,
    height: 56,
    backgroundColor: "#ebedf5",
    opacity: 0.5,
    borderRadius: 40
  },

  itemButtonText: {
    color: "#00cafc",
    fontSize: 27,
    lineHeight: 56,
    width: 116,
    height: 56,
    textAlign: "center"
  },

  listTips: {
    width: 750,
    height: 69,
    lineHeight: 69,
    textAlign: "center",
    fontSize: 21,
    color: "#b0b3bf",
    backgroundColor: "#ffffff"
    /*borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',*/
  },

  /*定向分享相关样式 */
  listDirected: {
    height: 400,
    marginTop: 0
  },

  AD: {
    width: 750,
    height: 320,
    backgroundColor: "#f5f6fa"
  },

  ADtext: {
    color: "#000000",
    fontSize: 28,
    width: 630,
    height: 280,
    lineHeight: 280,
    textAlign: "center",
    backgroundColor: "#ebedf5",
    marginLeft: 60,
    marginTop: 20
  },

  ADmask: {
    width: 0,
    height: 0,
    backgroundColor: "#ff0000"
  },

  caption: {
    width: 750,
    height: 77,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  captionLeftText: {
    marginLeft: 32,
    fontSize: 24,
    height: 77,
    lineHeight: 77,
    color: "#878b99"
  },

  captionRight: {
    marginRight: 32,
    width: 104,
    height: 77,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  captionRightImg: {
    width: 24,
    height: 24
  },

  captionRightText: {
    height: 77,
    lineHeight: 77,
    fontSize: 24,
    color: "#878b99"
  }
};
