<!-- Custom DOM Definition. -->
<products class={ displayed: true } ref="flux_products">

  <!-- Insert Components / Layout -->
  <detail each={ lists }>
    <imgbox><img src="{ img }"></imgbox>
    <description>
      <pdname>{ name }</pdname>
      <price>¥
        <span class={ addComma: true }></span><span class={ checkPrice: true }>{ price }</span></price>
      <stock>
        <span class={ shopStock: true }>Shop Stock</span><span class={ stockNumber: true }>{ stock }</span></stock>
      <button onclick={ add } disabled={ stock==0 } ="}">{ stock > 0 ? 'Add Cart' : 'Sold' }</button>
    </description>
  </detail>
  <!-- Insert Components End. -->

  <!-- CSS Definition. Using Sass. -->
  <style type="scss">
    :scope {
      display: inline-block;
      width: 50%;
      padding: 0 10px 0 0;
      transform: translate(-25%,0);
      opacity: 0;
      &.on {
        transition: all 0.5s ease-out 0.5s;
        transform: translate(0,0);
        opacity: 1;
      }
      detail {
        width: 100%;
        background-color: #fff;
        margin: 0 0 25px;
        border-left: solid 5px #999999;
        border-right: solid 5px #999999;
        box-sizing: border-box;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: stretch;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        &:last-of-type {
          margin: 0;
        }
        imgbox {
          display: inline-block;
          width: 50%;
          height: 150px;
          text-align: center;
          line-height: 150px;
          img {
            height: 150px;
            transform: scale(1);
            transition: transform 0.5s;
            &.sold {
              transform: scale(0.65);
              transition: transform 0.5s;
            }
          }
        }
        description {
          display: inline-block;
          width: 50%;
          color: #999999;
          padding: 20px 0;
          pdname {
            display: block;
            font-size: 24px;
            letter-spacing: 0.03em;
            margin: 0 0 5px;
            font-style: italic;
          }
          price {
            display: block;
            font-size: 20px;
            margin: 0 0 5px;
            span {
              &.addComma {
                font-size: 20px;
              }
              &.checkPrice {
                display: inline-block;
                width: 0;
                height: 0;
                opacity: 0;
              }
            }
          }
          stock {
            display: block;
            margin: 0 0 14px;
            span {
              &.shopStock {
                font-size: 12px;
                margin: 0 6px 0 0;
                font-weight: normal;
              }
              &.stockNumber {
                font-size: 16px;
                font-weight: bold;
              }
            }
          }
          button {
            cursor: pointer;
            border: none;
            border-radius: 6px;
            width: 200px;
            height: 26px;
            color: #fff;
            background-color: #999999;
            font-size: 16px;
            padding: 0;
            opacity: 1;
            transition: opacity 0.5s;
            transform: scale(1);
            transition: transform 0.25s;
            &:focus {
              outline: none;
            }
            &:hover {
              opacity: 0.6;
              transition: opacity 0.5s;
            }
            &:active {
              transform: scale(0.95);
              transition: transform 0.25s;
            }
            &:disabled {
              cursor: default;
              opacity: 1;
              background-color: #fff;
              border: solid 2px #999999;
              color: #999999;
              position: relative;
              transform: scale(0.9);
              transition: transform 0.5s;
              &:after {
                display: inline-block;
                content: " ";
                width: 100px;
                border-bottom: solid 2px #999999;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.6;
              }
            }
          }
        }
      }
    }
  </style>
  <!-- CSS End. -->

  <!-- JavaScript / Logic -->
  <script>
    import TodoAction from '../js/flux/actions'
    import RiotControl from 'riotcontrol'
    let product = this;

    product.lists = [];

    RiotControl.on('changes_product', (lists) => {
      product.lists = lists;
      product.update();
    });

    this.on('mount', () => {
      TodoAction.initCart();
    });

    this.add = () => {
      var target = this;
      TodoAction.addCart(target);
      return target = this;
    }
  </script>
  <!-- JavaScript End. -->

</products>
<!-- Custom DOM End. -->