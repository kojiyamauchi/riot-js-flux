<!--  Custom DOM Definition. -->
<subtitle class={ displayed: true }>

  <!-- Insert Components / Layout -->
  <h2>All The Small Things,<br>Online Shop</h2>
  <!-- Insert Components End. -->

  <!-- CSS Definition. Using Sass. -->
  <style type="scss">
  :scope {
    display: block;
    transform: rotateX(90deg);
    &.on {
      transform: rotateX(0deg);
      transition: all 0.5s;
    }
    h2 {
      font-size: 32px;
      font-weight: lighter;
      display: block;
      color: #fff;
      text-align: center;
      text-shadow: 2px 2px 2px rgba(0,0,0,0.6);
      margin: 0 0 15px 0;
    }
  }
  </style>
  <!-- CSS End. -->

  <!-- JavaScript / Logic -->
  <script>
  </script>
  <!-- JavaScript End. -->

</subtitle>
<!--  Custom DOM End. -->
