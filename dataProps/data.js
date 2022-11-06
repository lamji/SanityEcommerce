import React from 'react'

function data() {
    const data = [
    {
      "id": 1,
      "product": "CR-V",
      "description": "Other disorders of bone development and growth, ankle and foot",
      "stocks": 20,
      "price": 93,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIYSURBVDjLfZK/a1NhFIafm+YmTauoFTEodmgdxK1THfIHOIlQBwcXkYKb4FQcOlSHTo51qOggXcW/QUpLUQoKVWhd7GKEGoxNbu693/nhkLYkJnjgcJbvec/L+53I3Tmum8/e+/1bV9n83sDEUTVUDVNDxKhNn2dlbZuPK3eiY6ZIT5kqZo6EI1C6U6XbIo6K9iL9AifbgnahHvhE8B+BQp8DUdpJ4NLpMiHXvr5ypkIryVD9rwNdOvjyYfHehU0ulvcYtTYAiVf4wRSvd2YwKS71MlFviL5Wm0+0/Dy+fvdUKE2iWsAlJZKEuLNPvvu2NU7yuPjw0+qAgL+5MQvRu3zmSTXLy1jyG0nbeEhxySEaoTwaMbb7ok7w2/Gjna3+DFQW5NqDaiYVNGmieRf0kGNpgjQPSBpN0sm5qh3qwkCIblIL41NY57ALSg4SsJDhkmOhg/z5RUfGINPaYIjmE+YjeEgxyXENmHRhzY9EshTNBNNoYsg3Oq6KSTixftJ6NCXHNcNtyB24eSMKLTDtty5ZN4eQAQaSQaAx6EDDerH5lagYY5r3We9uVgpxhdHsJ5KzPuigY8vF7Vf1OEooxKNghmvAQwB3RirjlMdjip836m6F5aGHlD+9Oo+wlM/MVdPSZVQMzxIICaX2PsXtjbpJtHh2dW91qABAujA9ay1ZIFjNPJpAwT1qmLBupXj53MtvW73v/wKskrUnmSsmJgAAAABJRU5ErkJggg=="
    }, {
      "id": 2,
      "product": "S-Series",
      "description": "Fracture of unspecified phalanx of unspecified thumb, subsequent encounter for fracture with delayed healing",
      "stocks": 18,
      "price": 94,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALhSURBVDjLfZHtT1JhGMbd+kPaNElNnCHqARQ4TmnjRYRVSPk2hShMJ5IK2hQxdDqxZBnVkuYLpgg4TaeuzElutdXogyw/NNeHvrg258t0mCuuzmHLomVnu7frvp9rv+e+nhMHIO6kEsxzIZjlkLTO9Wcrc7xZ4b89MQ35gpfwZ8+fIZA7lT2j7yuM501karlj7L3/AoT0jXOcW7/6HF/2Ic+TtXWtTeQu6uSGuYMZkWIDr/tEAP85sZM7TRxGV/YSu9zxTHDcbHCG2GgN1CPwZQqm3nLItKyGfwKonGTOZBb4E8SOxFsAX8iFhfVR9L22gXk3CeXzcnjeOnHenor07nNIs6VQt04Tu1TO4+xUzojAzcF48B7uLFaiZaYYjTMV4DsJMLuTUTmqQn4R49PxBlTOIyonuM8yh/lu4utlXxHc7+2wzJXB6JOjdCQPao8CE+8eY2C5D2kdyeCpE6diInBG2W+IoQwQrgx4P9xH62wJ6r2FKB0ioRorxMMVG4zjKjx61QlmawpSzIz95MbEmpg3IJ5kHKonlOh9WYM6jwwlT/NwcViKB8sdqBlRoGrwAgXoRkoTA0nGM5GzdQlg3Iz//YDZA6yD675K2BcaUNV1CdaudrhcLjRbmqBxyNExaUBze3N0ZrPZtvV6fUNiVYL1GMB1ZHaxepjQ3q5Af38/Njc3sbGxgZWVFbR3taG6RY/Qx1B0trq6GvVIpdKemN/I0qWHao21CK6tQWMog0QqgVarhcPhgNlsjmqJRIyiK/J1GmI0GndiASxWj8Vq+UEDal06kPkklpaWEAwGEQgE4PP5wBfyI/FXT0e3sFqt4RgAk8m8odPptmmASF0QEeYJIRKJoFAookVrkiSPlErlIg2gvTGAZOqTyWTrdrt92+PxbPn9fjidThgMBphMpqimZ/QZ7aG9MQAGg3FKIBCki8XizxqNZr+6ujpM1Td2Met7mir1gNJ79Iw+oz209ye6Km+xbu69pwAAAABJRU5ErkJggg=="
    }, {
      "id": 3,
      "product": "Silverado 1500",
      "description": "Rheumatoid myopathy with rheumatoid arthritis of left hand",
      "stocks": 2,
      "price": 52,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJISURBVDjLpZLLS5RxFIaf7/NCZqiZYYW1sEbTKWsTDUS0sFpF/0K7aBftulCbTIQWQi1r0aK/IKhFIBUodlNKKtBIy2qsKUPLacbvdy4tRmuhSdDZHDhw3nOelzdyd/6nypcbXnx25oWZplXNVfXOpUzvkb8JxEuXT9djpFvXtJKqSUWimlnpgyUC53f3fEskyQcP5JM8IjKykkDk7nQ9P+tmiqqhpe5ta7dHYsLzqZFZEVVVjUWE60dvrl3igZrSUp3C3DB3HIvUDHdoX99eq664G4/Hh5Y3UVVRN8yN7NwkM8UZxAVzJ47KMHO21qYQkeURzj085apKTUUtjdWNvJoeQV1LOF7Cqsy9ZT4pMB1vQkQRUW4fvxvFAJcyvVHPvitRbi6HmhIsEFQQE4IJwYVCmKepoY2Kwhsy6T2IytIciCjqiqhS+fktZglugoqwsb6Ftg17+VHMc2/wGlq27Y/Ayb7jLqLUrapDzQgeiC3hUPrYbwTDyc6+Z2fTPuaSAkOTD+joimvLFy+nG9tQnInv47TXd/Dywyjqxrvp1wQTxAJBA9/nf7B7837mwk8eTfRPlwMEEQTlWW6YHQ27GP80QVGKiAqNNVuQBTOnZiepX7OB4fcDDLzp/5IIh0sfBEHNSK/rQNTIfp3Cpeg3Bi+TWBIVJWFrQ5pM82GevOunb+zup0TozHb7qwUE4cnYU0QVEUFEi7dOjFcBHLx6QCtQhj88jKO4ivtjfR8TozPb7aO/c/Av1XwhyquVrS6YNue6fWJx/gvSRpXk80tR+AAAAABJRU5ErkJggg=="
    }, {
      "id": 4,
      "product": "Murciélago",
      "description": "Superficial frostbite of right ankle",
      "stocks": 3,
      "price": 1,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJbSURBVBgZfcE9iFxVGMfh33v3zM7uODMr6iaoqJWypBELZfEDCy3TWElQQRAstLKwMJ1iJVqpaBdCyq1tLCVWsVhihBAwyy4SdWMyc+fjzr33nPP+XWEkW7g+j0niv5z/6vsvhr3eG6OF1swMMzbklCyZOU29uBA4wbDfe/Ods1ubvV7fuGeDpVkT+Xpn9+3ACcqKbq/Xt+u3Jlze/5CN4V9UbeTg8EGef+RTtrcexWzFAicwY5iA5E6/f8h65wGcBl/d589Rhcsx0zBwAomJxMa0ahnVNVlzZrHhblUzogEZEpNw47tnd9eGZ86YFdwjOsVbKxJMa2f/1pN49xqzWDEePcFTp7v8K5iKrcdevNAxMxBHBGakn3/EHcaLzNOnP+KZ/Q/45cYB45c/J8WEADMbBpJqvO02f3xDblegGGI2AJ3CEFd/e58YI1falvbhDu2114kxcu6FK0gQiFbIW3K7ilz44oDF7T3OWsWdS3u8xzErwHqA9UCwCFIZMK15WjD//ZD5zZ9QiljosnXuIimJpolg4A5FARbuY7HzCl/u7Jbz2eJiIBaE9VNsbp9nc9v5h/KENPkBb/aAiOIM5TnyirXHP+ZX4JN3X7qfI4EoKdd4dRXlklxdB0WQI68xE8pjlGcoVyDnuECD5AmPt1EqwQLKM1ACNUgFynM8TVGeghnHBVrJyCjdRWmM0hjlEqUS5RKlKcoTlOfIa7w54EjNUlDro1Td6cXZ6gAfFFIHfAB6COUGaFHRAC1WZHJdS603LAXVzWc3v33tOcSrGAP+jwC73OK6xNLfULttUqzYsnAAAAAASUVORK5CYII="
    }, {
      "id": 5,
      "product": "SRX",
      "description": "Benign carcinoid tumor of the duodenum",
      "stocks": 45,
      "price": 7,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFYSURBVDjLY/z//z8DJYCJgUJAsQEsuCQeHIgP/f/vX/H/f//9lFyWvCLJBff2xPD9+/27kV/O3xxIl5HsBaCmAj5Zb00+SUOGPz9/J19fF2BKtAG3NoVoATXl84oIMPz9tIlBXC9F4O/PX7WXl3iwEjQAaBPTn5+/KkW1ooUYfpxjOLVoKQOPwHeGPz9++QCxH0EDgDa5cQnrxfAKfmP49/M+A8P/fwx/v5xmUHQoZvzz82fzqUmWvDgNuLjQjQ1oS4uAnAHDv2+XgHq/MxgHqzP8+/WMgYPjFoO4boQm0HWFOA0A2p4qpOJtzMX7huH/n7cMDIzMDGfX3QIFKcO/H7cYRNXkgWp+Zx9q0tHCmg7+/PgJ9Ls/0MgHDEx8okCR/wxmSQFwe5g5lRmUXMvFbm1uagQKhGIa8PMXx7nZwd+BCQfo/H9I+D+cZgDR//9LILuAcehnJgBMs6gZ4tipDAAAAABJRU5ErkJggg=="
    }, {
      "id": 6,
      "product": "Bonneville",
      "description": "Nondisplaced osteochondral fracture of unspecified patella, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with malunion",
      "stocks": 10,
      "price": 3,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKdSURBVDjLjVNdSFNhGH7OPOtnbicKXVrmbFEg05QS9hPrYlF4E9FuuuzOorsg2IXRTUO6ki6kG28SEm+aELpBkdJIndOyQJpL05HSaNkudG47nt/eb7iRJOGBh3O+77zP8z7vc77D6bqO/12RSERQVfWlpmlzdH/o9/uVv98b9kEOETyKotwjBIeGhvh9CYTDYYEIJbLb7a7u7Oy00PN9QnBgYOBguY7bawRGLnd2uVym2dlZsDqfz4dQKKTRfoTg7+rqkv8RGB0dZeRhmtnNyDMzMygWixAEAR6PB0ajEYODgzmqecYy4fciE0rkeDxeIdefa8fzqTROW82g0cxU4yKYKxmMjIywmYcJFXI+n4fFYgFlgNjKJr6kt/A+mcX1Gzc5Il8gtBjK5HJnukzT09MVstPpxPz8PJayd8Dxd3GxsQqfk8vMxSHCgZLATufLXq/XFIvFdnVmYpQHREVCQ00zXi3cwsKnCYmNEAgExksZ0IIly8uyjLa2NqRSKYTXH2P89RNImgLpt4ITR8+iuc6JnJjH2+JTXoS0GEAA/I4Dl8Ph4MxmMwqFAmw2G5SMhKuO21B1DSQPDTrSG2tobbiELalo+Lga3TgfNBwrO8jncjkLs89mzmQyJcuM/D27BJlcKJoMWZWxuZ1D+ykvtuSCIZ6ayJYzaE8mkzLP84hGo7BarSQgQlEVHBcaUSfYUH/EDmPVYdRaTmJubRKTyxPrBQkdlYPU39/Pvu0K2a8VRREvMg9QlCTKYJu50c/UODiX/Ro+rE5hbPHNT0nBlXSPnth1Evv6+pjIUlNTUx3HcUgkEiKtW7u7u7+1BA35jkaf6d3i2A9JK5G/7vkv9Pb2lkQI1eywMDLbtz/i8qpWZSpqqv1Xj54q1/8B08jE6o+fnvoAAAAASUVORK5CYII="
    }, {
      "id": 7,
      "product": "Armada",
      "description": "Cerebral anoxia due to anesthesia during pregnancy",
      "stocks": 12,
      "price": 61,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKLSURBVDjLpVNLaBNRFD3vZTKZfCaftmltmghGLHUhVUQoRRApRVyo4M6luBBEQXDTjftu3IhW0IWgCNaN2qrUuGjFUmpR/EORgpbUhk7zaTOdJPN5M76ZVFBXhT44vDsz79w59553ieM42M6i2OYSrt55OymF5ANF1QxvNCxqc0E2HDAe2Fwd47Dt5vMmHBBmmrX1Yn5+YUFIJmKZ86e6o7rpECng+yc7+T8mzb2uW766zlJnhvUGVapW1rBs8mCygHzRgKY7WCzZyJdtLK3ZKKzbUFQHRc2ByYClkoHrzwqoaDqVk5ndVNMZCfgpujqjyL1XsLZhoiNK4OdiRB+BKLgA4kGCUtXAo+kVxFuiaI0HPE201rA8idkdEaQ7oph4p6CimmiLUI8o8kQxiaCsumQFba1RZLsiIJvmUa3Bmt3kB7OpCJKJEEan8h7BJcocJR7fe5VHLBbyzgSFv2zU6k0FhHfHMi1Igo2dXXE8n1OwVGx4eDqrIMPfySIDdSxP2Z/OCjWdwVVjGBZWyioyHTJE0Y9CWcKb+ap3UbozCSyvvsTc93GotQoahoEjvScA56CbwHK4t0QpcXJSRlDyw824qz2EnRyubTOfRvGjksPRw4eQbtmDyW9PkPt6C9VSPy+h/Ounzn3sSQedVIKiJcx4AxnaZYZU1EYnx9SH+9jf0wtGGXo7B8GIib59/dCqLxzB2FhdHLg8kQjI4bAQ8BGBd5Ny+3xcO6UElNfr0wqCn0RwfO85r/QrA7cx/mWER2OEbGWY+i+l66dPHpMsfsmHBu9iOHcWki+Ah4/HGlsaJtuxr81+noEIwfuzSARMf3ztfrpJtjrOfRdTw3y7wCFzqBwjszeWh34DRKkiE0cpxFcAAAAASUVORK5CYII="
    }, {
      "id": 8,
      "product": "6000",
      "description": "Nondisplaced unspecified condyle fracture of lower end of left femur",
      "stocks": 3,
      "price": 92,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVDjLpVM9ixNBGH5md/YjH3u3EnKX5BDcKyRNUAs7QUwawT9gZSptJL/gQK6ysLYUsfAX2CSNIVgKV4VwBqIQCGc06mFiYnazu+O8o1mihaA37MPM7L7v+zzPOztMCIGzDA1nHHy96Pf7L6MoqkogDEOsVqsEQRAk8H2f5na9Xq9RHiMLMvm6aZqdfD6vgv4cmzYNw0Cn08FwOKw1Go22UiAZH7iui/F4DMuykqTNRFqPRiNsbW3B8zwiPZCv26zb7Sr2XC6H6XT6m1yyQomMMei6rtgdx0Emk0Gr1cJgMKhxYifp5JWCbNtWWLNvKqE5jmMsl0tUKhX0er0DTkzz+RyTyUQ1aB1EzRRCBqeLCDQb33wLlsGxnYohTo6QcVylkgpUqTptKElaUpI1TcPOxatIp3ZxqZQFN3R8/BrgdOZjlrqA0ragnKpGrOSVQAXWoD2y57G/m8apz/B+Kt8xHXs7DiLTTY6YU4F1Ekkvl8tqJnz6HsA0DYR+iFi2wQ8FbK4jFFx9TwrQCfz0LBJQwGJhIFhFkA/C+FcjGbCQPSt5JaWSy462ms3mzY2/LJn3KjcwK1yBkzLhRwJck1a+rCA+9/Hk4TNJZLfY3y7T4+bQszjunMuahyRgOvfj8MMxu5Y/YfO3r2bvjo/usX+9jS8Ob90tFAuP8t5l983r5oL9z3V+fr98u7hfeRrHYeoHJYR682gpzWwAAAAASUVORK5CYII="
    }, {
      "id": 9,
      "product": "Mirage",
      "description": "Asphyxiation due to smothering under pillow, intentional self-harm",
      "stocks": 22,
      "price": 46,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACuSURBVCjPvdChDcMwFATQD4rKwgxNwypjAxNTN6hmNakMKkWKFGDqEQo6QEbICH+EjBBeXnoFUQ0MAqOjT7rTEWg/dAhInDi9Eo9TP8dvWP3LsZ31pNa228CSLskM6DMofPwbZFkzqM0yb6ADjeaJmEE+OgnSrBgEEl3Z0JsHQv73Km65GhnNHb6AlmUNgrnBFSBZ1MCbK2wBYmlq4CbLelYGBBJDw2c+DUdevZ8ffsX6A70Y4hwAAAAASUVORK5CYII="
    }, {
      "id": 10,
      "product": "Grand Prix",
      "description": "Dislocation of metacarpophalangeal joint of right thumb",
      "stocks": 19,
      "price": 52,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVDjLhVLPSxRhGH5mf8yOs9O6aa2b6BJhsW3RilAXDSW65clDdgwkEBH/gIiI6FC3uoRBQYeooP4Aw9isQ2xG5YZEVFrINmnFto67s7sz33xf76wedEfwgxdm4H1+vO/zSkIINL7Bax/PpxLRkXhUTVuMY/7Hci4z++2e/njofmNvYDvwqe726/2pcJsa9MMhgd7D4T5NUQ8GBibBZka3kPgaCZKk7IKbVT8qNodpcUToe6g33tadOjCyo4NYREkrpGyYHLYDMEfArHFoioTE/o70jgRVC3AIZDMqLogA9fKR12qVefblGWHui54rmDZCsoSaLVClUkMSVlYZZl7P53YkyGQ/T9+dWqoaFY6K5ZaDEo1w42GOVWaz7xv7pc0x9kxkh/uOxa6c6JSSnDz/MgJgFGM0ZCLALTzKrhZePnh1S+gXr3p2cHQ0kx7oSVwePtmWbNUCKFsCKb6+i3K1GXKQY2JfrCW/XJqQfGNvBL/9bMsILRF1/MzxWGo3RfbHoK3VjUkgDlhEsqDXEKJ0Lgx2tSJ56JJnB13tLf3NYR9+F20CCwJSuSnw9W8hJHxdMtHeqiAYix/xEGia0ilLPuRXKnVVx41vYwRG6XEOGGsMst8PWVF3eXZgWUyixChvCc6GMiNwja7RJjR3x3GLRFwyj4PFvPFzQTehNUn1f4e6LIfXCdxDovGR2BvEh+9lVArFNQ/BdCY/Pjq5eGfqbQGC1IPkpEkGwnREMvl09/DkxQpuPs0beDd3ets7cF/HuefL8ViU7YnIYbpcTS+Y0P9apXLe+IeSWRSfzvZs7v8PV6U0ly704DwAAAAASUVORK5CYII="
    }, {
      "id": 11,
      "product": "HHR",
      "description": "Contaminated medical or biological substances",
      "stocks": 7,
      "price": 98,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI7SURBVDjLpVPPaxNREP7e7uaHhmxD09AaDzYgGCIBoeBFpJCAKIoXT54Cgh6EXL0U/C/EmyD2ZHMTTBSN6akXoWiIJU1qTU3L4kZjk+xms5vNurN1Q1rtqQMf895jZr5vZneYZVk4iXE4oQnuoVqtvjdNM2UDw+EQhmGMoev6GIPBgHwxk8mkKY9RC3byotfrLUUiESfoqE226fF4UCqV0Gg00tlstugosBkfh0IhSJIEn883TppMpHOz2YQoiojFYkS6ZD8XWblcdtjD4TA6nc4hudQKJTLGwPO8wx4MBhEIBFAoFFCv19MCsZN06pWC/H6/A5d9rMTGqL4MfrcJVbyMZHIBlUplSSAmRVEgy7IzIAoejUagYZJ372J7FfHzGqYS9yGtPUG/daCSCqSIiS6UZLfkSOY4bqzgLNvAQrKLqQvXoDTyOBWcx5y8isjQSHHESr0SqIAL940w65MRSt6Cqdbgn4lCOA1Er17E7cQ+BCrgJpHUeDzueFc+vVu9rzDa38DxLTBOgVdsAZoKVRocFKAv4AT+HZjbN7MTxfZreObsgsMKuNFv+98NwjJ0VFe2kduahqBpWiGfz1+f+MscH+W3kBC/48zNO7D0t2BmF59fdWF2ZPD2jHK1GexhusCOW6ad3I312St3L+mtpxCEKWwUe+rHNSl7Tuuv+AM8Fp/vdA/twj9bxkNn/C54XwRf3vzsfVr/8fDBcv3Fsct01Pa2W+86+x/m1V9Kf3NTfnTvWe3l/+L+ANeBhMdSVgxaAAAAAElFTkSuQmCC"
    }, {
      "id": 12,
      "product": "Chariot",
      "description": "Displaced fracture of posterior column [ilioischial] of right acetabulum, initial encounter for open fracture",
      "stocks": 10,
      "price": 100,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjLxVNNSxtRFD0jEYqgBCMU00bEWFsqSNoi1EU2WiiluHEluuumfyH0B3RbuvQHCIpbaaFSxZULQYMUAklJCQZDjUTyMfl48z5675t0AgqCuPDC5dw3M+/c8+6Z5xhjcJfowx0j9L/IZrMfPc/7QtmhaLbb7Xqr1SpTppvN5jlhlTBHuZNKpeQ1AvrgK20EZSqZTK7dWkGj0einrt+JaPM2R3D28/KU8LGb2wMRIPz8LZTSkDYVPKkgPQVB6Hm8lhaFXxeZwDwM1QNGdoWN0Zza2LUi5JqfKa1tTfzYz1R6LkxGB1E8d/Hk0RAKf+t4FhtC/qyG6fEwcsUqEpPDyBQuMft0xD5jhUJIOHu/BSlooFh2LTO/4I6SuwRHMQEm4hG8nIpg97iEnydl9EnpS5p/MYo3r6J0Vo33r2PoCIWl5DjaQmNlIU5rjQ/vpuxmDibkeTjffrkm+qCFP6UapOTOva6swAuQlKmespmJCHbSJYTslKnr4twYNnbzWJ6fuNG2z+tpfFpNYPvg1DZytg4rJjYgoLpT11rbCQdoug5YF8gVdkr7+OPoDKGOkBcZ14xc8devu/+AVamUP2BKTdm9ghfOvd/Gf3hhfpp0UP3EAAAAAElFTkSuQmCC"
    }, {
      "id": 13,
      "product": "Forte",
      "description": "Benign neoplasm of short bones of unspecified upper limb",
      "stocks": 5,
      "price": 20,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACxSURBVDjL7dItC8JQAIXh491HWbDvD1pEDIIKm1zDxqKi0WIULAZFYc1msF3ErEZlMC9Mhxx/gTAR28KpDxx4QRK/DCXwAbDg0oLMTShtQF0F5AlwvwHkqy+Zxxs+lwsmvs8DKrIw8DCh8njNLOxRtxrU4yF3MFRhIBFQ2XxG3W7yXq8xjULGsIsDFwF58zzq0YBpFPDc6XIKp/iFI4S7h5BbWGoFW03gyABVtyzxT8Ab8Xzei+tkcykAAAAASUVORK5CYII="
    }, {
      "id": 14,
      "product": "Forenza",
      "description": "Sprain of ligaments of cervical spine, subsequent encounter",
      "stocks": 8,
      "price": 87,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGWSURBVDjLpZG9S5thFMXPG2NUxE8oxFAtKFnyLwiCHaxOnToodmoVh0qJFBVcRXQLuOhWLLQoWtsIfkCzmNLioA52EYz64mBKFAJKCXnuuU8HWykaS3i92z3Dj/O717HW4j7juxm8+TZQMvS1f9QzgNRZUnuKBTj/KkSTfbGG8tBrVYWbdUEqKMzQcFuEGzRc+tD76aQgILrZNx6sCI01V7XAcQBahaoiJzlkf2WRzv5E6jT1mUamlvvXv99SIDVAEgqFKEESYgU+x4fyQBnCwTAiDyNPjZGRzlh7Y0GFgbXn08HKhlck4Z65ECFC1SE0PXiEUn8AqsRe6gcO3IPol+Fk7NYRZ7reDbrn7tvjjLs392zRed+97Bymj2KJncTJZe4SF/kL1FbXwhh5cucXxMhLMTL/d//4YjVq8rK0f7wPv68UdTX1kLx0FlT43zyebLUdbR2gKuKrcWxN7DoA4C/23yYvMBSoVYjhdV40QIxAlLCWECNeAAT1TwPx2ICWoCroTYFXCqqglwYUIr6wAlKh1Ov8N9v2/gMRLRuAAAAAAElFTkSuQmCC"
    }, {
      "id": 15,
      "product": "Stealth",
      "description": "Pyoderma vegetans",
      "stocks": 21,
      "price": 2,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHbSURBVDjLdVK9qhpREJ7j7vrLGlhRiaCFFikkT2BxQZs8Q7pgJ9rcVuIj3MYHSJdXUAj+FDa2wSaIIihcJVUs1t91c75z7yyLd+8Hw5k5M9/MnDkjXNclYDqdDhzHqV6vV5In4fTL5XLx68N6vV4DTyCBJD/EYrFxsVik8/lM9+AigGEYNBqNaL1e15rN5lDHpczasSyLttstRSIRj+QnQt9sNpRMJqlUKtFyuWzL66GYTCYP8Xh8XCgUaL/fqw5Y0C6IQgjSNE1VN02TEokEDQYDWq1WNV2+p5NOp9UbERSNRpVwdX8nOG+3Gx2PRyqXyzSfz9s6qhwOB9rtdmTbtkeAcAcgASgCW9d1ymQyyo8EVVSezWaqVSbjCaFQyEsAMvsBDFzeVXX+nnw+T6fTSQVDkBQ+fCnPATZ8sJmn87/LqaqKnIBnwglgc0cAYlQCOFKpFFUqFS+Yg2BzMMh+fy6X8xL0e73eF27pbuPebCRvKU4pfeFfFkar1focDod/Z7NZZcutu3W7XY0CIBqNhhvkIC1inzVLraXh/LOFY5tBYWqVsZr3WCwW8WK1ofTNr+/mOzEvCaDc469buHywHYN1GWQEPiFoBsDHr3+e5PHt1fzx/PPTY1Dcf079mla6MmR7AAAAAElFTkSuQmCC"
    }, {
      "id": 16,
      "product": "V8 Vantage",
      "description": "Intermittent hydrarthrosis, unspecified hip",
      "stocks": 44,
      "price": 27,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKSSURBVDjLnVPdSxRRFP/N7Pq1U+q2an5tPqSVPQjhF1hYrElJBBE9RPQY7Ev00h9Q7EMLRSAGhUIP0UNqQkaYCOVDUJEZ9iDqurhGsaDpbOvq7uzO3I/uzK7rWi/R4f44Z2bu+Z3fmXuuxDmHaYFAgDPGYIJSaoEQkvW5MAwj6+3ImLmxuroW0VgMMEnTy4q55Xg2Nr3TWYrx8bHdBNGNDdzoe49/sXveVui6vkNgp/NwREdx59wWbLINjDLBKsAIknohRlevI85dkGUZi/Nz4IwjlUqlCdSvHlsBaYfDVYODrnJwg1igugbt1wJe/uxCgjkhyRIgSch0YSmQrQfK3AqbRl5RHVh8TmxUhAJRObqIV8udmE90gEuyyJUsmMY4SxOsfzmVLwiuFZUeFq+FdG1FqE5hbXkCY6E2zCZO7iSaPtOyOLL0P2CUHuOEeQv2NoATTXBUQZyPWDJK5FV0OAZhYzqSVEEQp5GQKjIK0i3YRfKDQldLmaYuiMoM+Y568dWOqrpulKpBUENHNDyD598vYDb+AzpftQhsdltGAaHD8fDHd2Gt/WZlRTliwddw1naBJKPQE+vYIAeQOvIIHXV5uLi/EpqmWQQy0i1I25M4NDR0n5NNT2thX5OjuF6OrCyR5c3GD8mKS53m1AWDwcfCe8T0RXKm8kWWwLTQyNG3+Y5qj6Z+G55Ur87EDKX7+IlOT0mJE4PPnmoi4bbf77+bO1BZgtBIYw8z6MMtvfjWpHrlSUPDIexzlYESCYaopihFCC0FMDX1Kd7b27snO4DbgUgOC5x/s3bZ7XbXoKfnrCXTLGDCnMCW5iZEIqri9XrP9Pf3T+xSkGs+n29a9Nr85y3M3MzPAwMDbX+18L/2G23Jn5HeUDltAAAAAElFTkSuQmCC"
    }, {
      "id": 17,
      "product": "Park Avenue",
      "description": "Myogenic ptosis of right eyelid",
      "stocks": 14,
      "price": 37,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK2SURBVBgZBcFNiJRlAADg532/b2Z2Z9fdUdfWUlwNooJIFNryEEUSBAVCVy9eIrwJngqCwI4Jdg46VBIdukRQtBAdOliUHQ0qlbXE9afdmXVn5vt7v54ntG0Lznx1axWXHh/MnBhXybhKqpRM6jTENu6jwSYe4DN8nwOkun7+6P75E+df2gcAdsq0OC7T4ua0OVhWbBeNm/cf+vbvnVdxLgdIdb280A3g1lajE4I8kOX0OtGhXpTFqJNx7OCsxxbn9nz8y+2LEaCpqoW5nDqxXQbDiq2C4ZThlAcT7j5swDuX1504MueZpc6+HKCpqj27utFOwc60EWOQI8uIGZkgCySEZuTK9U1X14e3c4CmLJcXZzPDSW1ctGJsZZHYBFkk08oytJmNUeGjtb9GOJMD1GW5srzQMZy2any99qddPcZlbfd81+27EyEy38882u/aHE0Wfvj932EO0JTFyv7FnmsbjRCZjKdeWX3SqePzvrnyj/dOPw0APv3xnpTCzxFeu/DdrKbu9jpR2RC1xkXlv+0arP26AWBaMyq4t1UKIYlQF+W+XiAGErTEGGQtVZNcPHtcSq0mtTJJP0+KojDaKeXQlEU/n+vKI1kMmhTMdKJpUfngy5tioG6S1CQt2ralpd9J8hfPXV7ChdWnDrkzat3caMzNUKdW0dSy2EEraIQQtKnVtkldV8qyljdleRKv/3bths1J7mHRqprW9rjSCbmzb+xSpxKRljYkM3nXh1+sezDakTdVdfzUy8/Ovnv6BQDw5vs/yXQkE59cfdtS/5Aguje+5a3nLolmjItS3lTVjTv3hz5fu2YwP2uwMGMw15PnmcP7WZ7fdvLoqkH3AJGt6QGPzNX6XfIQhGOnLy3hHFawF3uxO/aPHH5iZU9n0BuYyRfUqRJSEtpGCmN/rF93d1T5H4CHTHMseNtCAAAAAElFTkSuQmCC"
    }, {
      "id": 18,
      "product": "Sentra",
      "description": "Laceration of intrinsic muscle, fascia and tendon of right ring finger at wrist and hand level",
      "stocks": 10,
      "price": 30,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ7SURBVDjLpZNNbxJRFIb7A/wF/A5YunRDovEjalEXJm5M2Ji4aFoTI6kxjcVaCGOJYtq0NlBJ0AS0tcbWSkeQhhQopQwfAhYotAwIAwPDUI5zLh9SdedN3kzmznmfc86dc4cAYGhQZ2ZAJkkhSSlJ1ZWyuyf7M37QeEqSfOxNWW37uk+5fVF6Z3ePDQRD7KY3TL/eSFAj1qIaYzD2BKBrPm1xZjWBvTiTK5SB45sgHreJKjUBMvkiuLxBZnY1rsHYHqQHkKM5GP7O1Rsi4OKFFhS5JrCSqo0W2eN4ATY9fs60HEGInACwLywbM/fMR2UB9gt1yJUEomypAYk834esrruYO4s5bEeGAIWN/kFh2YNmldZ7wjw8uUX2cYUTB2Cwuin0IkDp2o7Q2DOWmjqqw6WHTgLIFBsQz/Fw7p6DAPBbuSbCYYmHuSUHjV4EqPw7uyweVv6nABfHP0vaIAbMfHbMLskBVx97yDtWIYjHsGheYtFLAL5AkAAKlSZcm/LDhQefCACBlx/RcP7+B7gy4SbVdKpowtz8qz5A+WUrRJe4BlR4EdKs1P8Tn9TCNiQPOwaEDU96IXZQI38mmi6BwWTut6Awr8WoVKYA7TYQA5Z5YzpAMqKw9OtP/RDJ1KDZasP6txBojO/7hyi7azlSrzk9DFvunDKaMDtmjGZrxIhPTBCTsuufLzC3jNHOb+wNkuFtQGP/6ORyxSoJLFVFUg2CcJgwczRdBJ3Jwo0aln8P0uAoa80ezYLVzrj9MUjlyuRMsOdQkoUVZwC0hllmRP/u71EevEy3XybV4y9WqKmZedrwzMhO6yl2QmeiR3U26iYV/vdl+p/r/AvMhAk86cw6LgAAAABJRU5ErkJggg=="
    }, {
      "id": 19,
      "product": "Aspire",
      "description": "Pedal cycle driver injured in collision with other pedal cycle in nontraffic accident, subsequent encounter",
      "stocks": 11,
      "price": 94,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIbSURBVDjLjVPPaxNREJ79Qena1EO6u/GQ9CiFouCp5FQQET0KQvBQbA/tqf+BCEXoyauCl7KFHkoOvYimUpToRTyISVtsliImpCwkLUGqxvzY3bfOvO2+bOgljx32vdn5Zr4336wUBAGUy+V7f96/3PVaDnjNKty17DkYbZ1KpVLppu/7n5nbnVDAh7NXK3Bn4/tIaFVV59R8Pm9ns9nV8aOClZhCbwDguu5QIGMMiGn8rGlamCSXy80ggxfMXAAFPPj9qXipkizLHBQtSZJEQsFg7KBgTZroZGEArWc7TSAchXIA4w+sPdQH1xAMDGQgeXD+4aNIQODZjHaRILT9Wpt/Q8wwA3X/rXVVD3glkQD3h7V/vGrA8Bvz0Rf2AK/F7zRQoY8qIAPn+TLczx/xRPF709nzPOFHayeTyfkBg29vrEkj5BkFPdlu4NtHugH4wYUSqNBaziQGE5hXifXgMVfh115RdHr90TUOIkPNBZtutwvVahUURZFlYuA4zmqzsAl/v24BFhQSRXJFDYvAlUoFUqkU+VmMwSLIyKC1W4ypwISRr9PpgG3bkMlkQNf1YRXkL6+thIlN8y9PIDGgygROp9NgGMZgqOIqEIPa0yV4sPeDgwlIne/1etBoNHhV0zTjExn+Cxh041bl3c8rSY0PCzWIgGQRCxpnSlKv1/m+3++HSaKGLV2fmp9OjN122u7JxnHrYNTf+T+76nzVPsi2lQAAAABJRU5ErkJggg=="
    }, {
      "id": 20,
      "product": "3000GT",
      "description": "Toxic effect of dichloromethane, accidental (unintentional), sequela",
      "stocks": 6,
      "price": 27,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJgSURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4D4zxotum4sjfh/e2Pr/wtz3f5fnKodx/A7O3P97/TU37+Sk9ajG+Bcc/bJnI0X/hfM3/t/YlfJ/ef7yv9/uLTl///PT/+/v7Tm/8Eun08Mv9NSf//buun/z9jYvz8iIs0Qms/YO1ae/GBfdvTNtMm5y99dqv338/Gm/88PdP//dnnd/z8Pjvw/PzfjH8PPxIT1P2Nifv8Ij7j0PSjk3jdf/5Mr4poWOZUfe2hXdsT+yXYVj3eXa/79/Xbk/7e7Of/fnsr9f31x8v/j05P+Ruf1tqI4Gehftv6UybvP+CZ9+mDr/OpVnPGjd5cr///9fvz/1zvx/78/iv7/6VrV//szHV6c7XUxQAlEoH8lHKtOHbMvP7bUtuQQ5/F8pbLnp8uhmuP+f38Y9f/jler/d6Y6fbrZY2YCT4mudRcKgP59DvTvG6B/S0GC25olg6/tKP7599uh/9/vJ///8Sj2/wegS25Pdf52o8dCASUpO1WfeTB5zcX/QP++BAnMyZRNvrqt6v/F7RP+PzkZ+v/r/ej/by9U/L81xfHljV4LJYy84FBxvMCu9PADm6L94Lhe1en8//+nB/9vzAr5v69K6v/RGZ7/DzaZPL3UYa5DVGZqTtX+/fP4lP8/T078f7LV8f+qFJnPOyv19InOjaG2gt/b4zV+7+3w/L2n1+ng5nJdJXypFQA6mcPFnqo5OgAAAABJRU5ErkJggg=="
    }]

    // state
    const [modalEdit, setModalEdit] = React.useState(false)
    const [editProduct, setEditProduct] = React.useState([])

    const handleDataOut = (props) => {
        setModalEdit(props?.status)
        const prodectToEdit = data.filter(product => product?.id === props?.product_id)
        setEditProduct(prodectToEdit)
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function truncateString(str, num) {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      }
  return {
    data,
    handleDataOut,
    modalEdit,
    setModalEdit,
    editProduct,
    numberWithCommas,
    truncateString
  }
}

export default data