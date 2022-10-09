// import logo from '../logo.svg';
// import '../App.css';
import { useEffect, useRef, useState } from 'react';
import { MY_ACCESS_KEY } from '../utils/Utilities';
import { createApi } from 'unsplash-js';
import { getRandomImages } from '../utils/DummyData';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store'
import { setBottomCount, setImageList } from '../redux/actions';
import './TortoiseDemo.css'
import Device from 'react-device'



function TortoiseDemo() {
  const divRef = useRef();
  const dispatch = useDispatch();
  const [splitArray, setSplitArray] = useState([]);
  const [isMobile, setIsMobile] = useState(false)
  const SPLIT_COUNT = 3;
  const PAGINATION_COUNT = 12;
  const { bottomCount, imageList } = useSelector(state => state.dashboard);  // const [imageList, setImageList] = useState([])


  const unsplash = createApi({
    accessKey: MY_ACCESS_KEY,
    // `fetch` options to be sent with every request
    headers: { 'X-Custom-Header': 'foo' },
  });


  const onChangeDevice = info => {
    // console.log('onChangeDevice info ', info)
    if (info.screen.height > info.screen.width) {
      console.log('onChangeDevice Mobile ')
      setIsMobile(true)
    } else {
      setIsMobile(false)
      console.log('onChangeDevice DeskTop ')
    }

  };

  useEffect(() => {
    const scrollListener = () => {

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - window.innerHeight) {
        const { bottomCount } = store.getState().dashboard;
        console.log("you're at the bottom of the page", bottomCount)
        dispatch(setBottomCount(bottomCount + 1))

      } else {
      }

    }
    let throttleTimer;

    const throttle = (callback, time) => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    }

    window.addEventListener("scroll", () => {
      throttle(scrollListener, 100);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        throttle(scrollListener, 100);
      });
      // window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  useEffect(() => {
    let arr = [];
    // getRandomImages.map((val) => {
    //   arr.push(val?.urls)
    // })
    // dispatch(setImageList(imageList?.length ? [...imageList, ...arr] : [...arr]))

    unsplash.photos.getRandom({
      count: 12,
    }).then(result => {
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
      } else {
        // handle success here
        const photo = result.response;
        photo.map((val) => {
          arr.push(val?.urls)
        })
        dispatch(setImageList(imageList?.length ? [...imageList, ...arr] : [...arr]))
        // console.log(photo);
      }
    });
  }, [bottomCount])

  useEffect(() => {

    let i = 0;
    let arr = [...splitArray];
    imageList?.map((val) => {

      i++;
      if (arr.length && arr.length > i - 1) {
        let ifExist = arr[i - 1].div.some(value => (value.regular === val.regular));
        if (!ifExist) {
        arr[i - 1].div.push(val)
        }
        // arr[i - 1].div.push(val)
        // console.log('val.urls  ', val)
      } else {
        arr.push({ div: [val] })
      }

      if (i >= SPLIT_COUNT) {
        i = 0
      }
    })
    setSplitArray(arr);
  }, [imageList])

  // useEffect(() => {
  //   splitArray?.map((val) => {
  //     console.log('split ARRAY val ', val.div.length, ' split ARRAY  ', splitArray.length, ' bottomCount ', bottomCount, ' imageList ', imageList.length)
  //   })

  // }, [splitArray])

  const renderList = (list = [],) => {
    return (
      list.map((val, index) => {
        return (
          <img key={index} src={isMobile ? val?.small : val?.regular} />
        )
      }))
  }


  return (
    <>
      {/* <Header /> */}


      <div className='gallery-container'
        ref={divRef}
      >
        <Device onChange={onChangeDevice} />

        {isMobile ?
          < div className='container-1'>
            {renderList(imageList)}
          </div>
          :
          <>
            {splitArray.map((val, index) => {
              return (
                <div className='container-1' key={index}>
                  {renderList(val?.div)}
                </div>)
            })}

          </>
        }
      </div >
    </>
  );
}

export default TortoiseDemo;
