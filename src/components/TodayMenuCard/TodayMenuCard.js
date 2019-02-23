import React, { Component } from 'react';
import './TodayMenuCard.less';
import { Empty} from 'antd';

class TodayMenuCard extends Component {
  render() {
    const { todayMenu } = this.props;
    const breakfast = todayMenu.breakfast || []
    const lunch = todayMenu.lunch || []
    const dessert = todayMenu.dessert || []
    const dinner = todayMenu.dinner || []
    return (
      <div className="MenuCard">
        <div className='title'>今日菜单</div>
        <div className='todaymenu'>
            <div className='breakfast'>
              <div>早餐</div>
              <ul>
                {
                  (breakfast) ?
                  breakfast.map(data => <li key={data.index}>{data}</li>) : <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span>
                      暂未排餐哦~
                    </span>
                  }
                />
                }
              </ul>
            </div>
            <div className='lunch'>
              <div>中餐</div>
              <ul>
                  {
                    (lunch) ?
                    lunch.map(data => <li key={data.index}>{data}</li>) : <Empty 
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    description={
                      <span>
                        暂未排餐哦~
                      </span>
                    }
                  />
                  }
                </ul>
            </div>
            <div className='dessert'>
              <div>点心</div>
              <ul>
                {
                  (dessert) ?
                  (dessert.map(data => <li key={data.index}>{data}</li>)) : (<Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span >
                      暂未排餐哦~
                    </span>
                  }
                />)
                }
              </ul>
            </div>
            <div className='dinner'>
              <div>晚餐</div>
              <ul>
                {
                  (dinner) ?
                  dinner.map(data => <li key={data.index}>{data}</li>) : <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span >
                      暂未排餐哦~
                    </span>
                  }
                />
                }
              </ul>
            </div>
        </div>
        
      </div>
    );
  }
}

export default TodayMenuCard;